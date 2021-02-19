using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using retrieve_data.Models;

namespace retrieve_data.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoItemsController : ControllerBase
    {
        private readonly TodoContext _context;

        public TodoItemsController(TodoContext context)
        {
            _context = context;
        }

        // GET: api/TodoItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoItems>>> GetTodoItemss()
        {
            return await _context.TodoItemss.ToListAsync();
        }

        // GET: api/TodoItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TodoItems>> GetTodoItems(int id)
        {
            var todoItems = await _context.TodoItemss.FindAsync(id);

            if (todoItems == null)
            {
                return NotFound();
            }

            return todoItems;
        }

        // PUT: api/TodoItems/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTodoItems(int id, TodoItems todoItems)
        {
            if (id != todoItems.Id)
            {
                return BadRequest();
            }

            _context.Entry(todoItems).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TodoItemsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/TodoItems
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TodoItems>> PostTodoItems(TodoItems todoItems)
        {
            _context.TodoItemss.Add(todoItems);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTodoItems", new { id = todoItems.Id }, todoItems);
        }

        // DELETE: api/TodoItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodoItems(int id)
        {
            var todoItems = await _context.TodoItemss.FindAsync(id);
            if (todoItems == null)
            {
                return NotFound();
            }

            _context.TodoItemss.Remove(todoItems);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TodoItemsExists(int id)
        {
            return _context.TodoItemss.Any(e => e.Id == id);
        }
    }
}
