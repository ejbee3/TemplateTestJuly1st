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
  public class StudentController : ControllerBase
  {
    private readonly DatabaseContext _context;

    public StudentController(DatabaseContext context)
    {
      _context = context;
    }

    // GET: api/Student
    [HttpGet]
    public async Task<ActionResult<List<Student>>> GetStudents()
    {
      return await _context.Students.ToListAsync();
    }

    // GET: api/Student/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Student>> GetStudent(int id)
    {
      var student = await _context.Students.FindAsync(id);

      if (student == null)
      {
        return NotFound();
      }

      return student;
    }

    // PUT: api/Student/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutStudent(int id, Student student)
    {
      if (id != student.Id)
      {
        return BadRequest();
      }

      _context.Entry(student).State = EntityState.Modified;

      try
      {
        await _context.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!StudentExists(id))
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

    // POST: api/Student
    [HttpPost]
    public async Task<ActionResult<Student>> PostStudent(Student student)
    {
      _context.Students.Add(student);
      await _context.SaveChangesAsync();

      return CreatedAtAction("GetStudent", new { id = student.Id }, student);
    }

    // DELETE: api/Student/5
    [HttpDelete("{id}")]
    public async Task<ActionResult<Student>> DeleteStudent(int id)
    {
      var student = await _context.Students.FindAsync(id);
      if (student == null)
      {
        return NotFound();
      }

      _context.Students.Remove(student);
      await _context.SaveChangesAsync();

      return student;
    }

    private bool StudentExists(int id)
    {
      return _context.Students.Any(e => e.Id == id);
    }
  }
}
