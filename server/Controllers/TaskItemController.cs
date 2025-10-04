using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using server.Datas;
using server.DTOs;
using server.Interfaces;
using server.Mappers;
using server.Repositories;

namespace server.Controllers
{
    [Route("server/models")]
    [ApiController]
    public class TaskItemController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly ITaskItemRepository _repo;
        public TaskItemController(ApplicationDBContext context, ITaskItemRepository repository)
        {
            _context = context;
            _repo = repository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromHeader(Name = "User-Email")] string userEmail)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var tasks = await _repo.GetAllByAssignedByAsync(userEmail);
            var taskDto = tasks.Select(x => x.ToTaskItemDTO());
            return Ok(taskDto);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var task = await _repo.GetByIDAsync(id);
            if (task != null)
            {
                return Ok(task.ToTaskItemDTO());
            }

            return NotFound();
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromHeader(Name = "User-Email")] string userEmail, [FromBody] CreateTaskItemDTO taskItemDTO)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var taskItem = taskItemDTO.FromCreateTaskItemDTOToTaskItem();
            taskItem.AssignedBy = userEmail;
            await _repo.CreateAsync(taskItem);

            return CreatedAtAction(nameof(GetById), new { id = taskItem.Id }, taskItem.ToTaskItemDTO());

        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateTaskItemDTO taskItemDTO)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var taskItem = await _repo.UpdateAsync(id, taskItemDTO);
            if (taskItem != null)
            {
                return Ok(taskItem.ToTaskItemDTO());
            }

            return NotFound();
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var taskItem = await _repo.DeleteAsync(id);
            if (taskItem != null)
            {
                return NoContent();
            }

            return NotFound();
        }
    }
}