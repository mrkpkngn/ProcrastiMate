using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.DTOs;
using server.Models;

namespace server.Interfaces
{
    public interface ITaskItemRepository
    {
        Task<List<TaskItem>> GetAllAsync();
        Task<List<TaskItem>> GetAllByAssignedByAsync(string userEmail);
        Task<TaskItem?> GetByIDAsync(int id);
        Task<TaskItem> CreateAsync(TaskItem taskItem);
        Task<TaskItem?> UpdateAsync(int id, UpdateTaskItemDTO taskItemDTO);
        Task<TaskItem?> DeleteAsync(int id);

    }
}