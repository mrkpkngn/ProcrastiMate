using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    public enum Status
    {
        Pending, // 0
        Done, // 1
        Overdue, // 2
    }
    public class TaskItem
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public Status status { get; set; } = Status.Pending;
        public DateTime Created { get; set; }
        public DateTime Deadline { get; set; }
        public string AssignedBy { get; set; } = string.Empty;
        public string? AssignedTo { get; set; }
    }
}