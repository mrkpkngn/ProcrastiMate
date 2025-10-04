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

        public async Task<List<TaskItem>> GetAllByAssignedByAsync(string userEmail)
        {
            return await _dbContext.TaskItems.Where(x => x.AssignedBy == userEmail || x.AssignedTo == userEmail).ToListAsync();
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

        public async Task<TaskItem?> DeleteAsync(int id)
        {
            var taskItem = await _dbContext.TaskItems.FirstOrDefaultAsync(x => x.Id == id);
            if (taskItem != null)
            {
                _dbContext.TaskItems.Remove(taskItem);
                await _dbContext.SaveChangesAsync();
                return taskItem;
            }
            return null;
        }
    }
}