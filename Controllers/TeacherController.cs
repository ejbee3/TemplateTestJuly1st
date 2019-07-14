using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TemplateTestJuly1st.Models;
using templatetestjuly1st;

namespace sdg_react_template.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  [Authorize]
  public class TeacherController : ControllerBase
  {
    private readonly DatabaseContext _context;

    public TeacherController(DatabaseContext context)
    {
      _context = context;
    }

    // GET: api/teacher
    [HttpGet]
    public async Task<ActionResult<List<Teacher>>> GetTeachers()
    {
      return await _context.Teachers.ToListAsync();
    }

    // GET: api/teacher/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Teacher>> GetStudent(int id)
    {
      var teacher = await _context.Teachers.FindAsync(id);

      if (teacher == null)
      {
        return NotFound();
      }

      return teacher;
    }

    // PUT: api/teacher/5
    [HttpPut("{id}")]
    public async Task<IActionResult> Putteacher(int id, Teacher teacher)
    {
      if (id != teacher.Id)
      {
        return BadRequest();
      }

      _context.Entry(teacher).State = EntityState.Modified;

      try
      {
        await _context.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!teacherExists(id))
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

    // POST: api/teacher
    [HttpPost]
    public async Task<ActionResult<Teacher>> Postteacher(Teacher teacher)
    {
      _context.Teachers.Add(teacher);
      await _context.SaveChangesAsync();

      return CreatedAtAction("Getteacher", new { id = teacher.Id }, teacher);
    }

    // DELETE: api/teacher/5
    [HttpDelete("{id}")]
    public async Task<ActionResult<Teacher>> Deleteteacher(int id)
    {
      var teacher = await _context.Teachers.FindAsync(id);
      if (teacher == null)
      {
        return NotFound();
      }

      _context.Teachers.Remove(teacher);
      await _context.SaveChangesAsync();

      return teacher;
    }

    private bool teacherExists(int id)
    {
      return _context.Teachers.Any(e => e.Id == id);
    }
  }
}
