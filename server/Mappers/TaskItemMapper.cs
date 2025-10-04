using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.DTOs;
using server.Models;

namespace server.Mappers
{
    public static class TaskItemMapper
    {
        public static TaskItemDTO ToTaskItemDTO(this TaskItem taskItem)
        {
            return new TaskItemDTO
            {
                Id = taskItem.Id,
                Title = taskItem.Title,
                Description = taskItem.Description,
                status = taskItem.status,
                Created = taskItem.Created,
                Deadline = taskItem.Deadline,
                AssignedBy = taskItem.AssignedBy,
                AssignedTo = taskItem.AssignedTo,
            };
        }

        public static TaskItem FromCreateTaskItemDTOToTaskItem(this CreateTaskItemDTO taskItem)
        {
            return new TaskItem
            {
                Title = taskItem.Title,
                Description = taskItem.Description,
                status = taskItem.status,
                Deadline = taskItem.Deadline,
                AssignedTo = taskItem.AssignedTo
            };
        }
    }
}