using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using server.Datas;
using server.DTOs;
using server.Interfaces;
using server.Models;

namespace server.Repositories
{
    public class TaskItemRepository : ITaskItemRepository
    {
        private readonly ApplicationDBContext _dbContext;
        public TaskItemRepository(ApplicationDBContext dBContext)
        {
            _dbContext = dBContext;
        }

        public async Task<List<TaskItem>> GetAllAsync()
        {
            return await _dbContext.TaskItems.ToListAsync();
        }

        public async Task<List<TaskItem>> GetAllTasksForUser(string userEmail)
        {
            var tasks = await _dbContext.TaskItems.Where(x => x.AssignedBy == userEmail || x.AssignedTo == userEmail).ToListAsync();

            var now = DateTime.Now;

            foreach (var task in tasks)
            {
                if (task.Deadline < now && task.status != Status.Done)
                {
                    task.status = Status.Overdue;
                }
            }

            await _dbContext.SaveChangesAsync();

            return tasks;
        }

        public async Task<TaskItem?> GetByIDAsync(int id)
        {
            return await _dbContext.TaskItems.FindAsync(id);
        }
        public async Task<TaskItem> CreateAsync(TaskItem taskItem)
        {
            await _dbContext.TaskItems.AddAsync(taskItem);
            await _dbContext.SaveChangesAsync();
            return taskItem;
        }

        public async Task<TaskItem?> UpdateAsync(int id, UpdateTaskItemDTO taskItem)
        {
            var taskItemModel = await _dbContext.TaskItems.FirstOrDefaultAsync(x => x.Id == id);
            if (taskItemModel != null)
            {
                taskItemModel.Title = taskItem.Title;
                taskItemModel.Description = taskItem.Description;
                taskItemModel.status = taskItem.status;
                taskItemModel.Deadline = taskItem.Deadline;
                if (taskItem.AssignedTo != null)
                {
                    taskItemModel.AssignedTo = taskItem.AssignedTo;
                }
                await _dbContext.SaveChangesAsync();
                return taskItemModel;
            }

            return null;
        }

        public async Task<TaskItem?> DeleteAsync(string userEmail, int id)
        {
            var taskItem = await _dbContext.TaskItems.FirstOrDefaultAsync(x => x.Id == id && (x.AssignedBy == userEmail || x.AssignedTo == userEmail));
            if (taskItem != null)
            {
                _dbContext.TaskItems.Remove(taskItem);
                await _dbContext.SaveChangesAsync();
                return taskItem;
            }
            return null;
        }

        public async Task<List<TaskItem>> GetAllByFilter(string userEmail, int status)
        {
            return await _dbContext.TaskItems
             .Where(x => x.AssignedBy == userEmail || x.AssignedTo == userEmail)
             .Where(x => (int)x.status == status)
             .ToListAsync();
        }

        public async Task<List<TaskItem>> GetAllDueToday(string userEmail)
        {
            return await _dbContext.TaskItems
             .Where(x => x.AssignedBy == userEmail || x.AssignedTo == userEmail)
             .Where(x => x.Deadline >= DateTime.Today && x.Deadline < DateTime.Today.AddDays(1))
             .ToListAsync();
        }
    }
}