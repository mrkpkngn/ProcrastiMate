using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using server.Models;

namespace server.DTOs
{
    public class CreateTaskItemDTO
    {
        [Required]
        [MinLength(5, ErrorMessage = "Title must be over 5 characters.")]
        [MaxLength(30, ErrorMessage = "Title cannnot be over 30 characters.")]
        public string Title { get; set; } = string.Empty;
        [Required]
        [MinLength(5, ErrorMessage = "Description must be over 5 characters.")]
        [MaxLength(120, ErrorMessage = "Description cannot be over 120 characters.")]
        public string Description { get; set; } = string.Empty;
        public Status status { get; set; } = Status.Pending;
        public DateTime Deadline { get; set; }
        [Required]
        [EmailAddress]
        public string AssignedBy { get; set; } = string.Empty;
        public string? AssignedTo { get; set; }
    }
}