using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Models;

namespace server.DTOs
{
    public class TaskItemDTO
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public Status status { get; set; } = Status.Pending;
        public DateTimeOffset Created { get; set; } = DateTime.Now;
        public DateTimeOffset? Deadline { get; set; }
        public string AssignedBy { get; set; } = string.Empty;
        public string? AssignedTo { get; set; } = string.Empty;
    }
}