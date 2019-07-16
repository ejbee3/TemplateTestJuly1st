using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TemplateTestJuly1st.Models;
using templatetestjuly1st;

namespace TemplateTestJuly1st.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  [Authorize]
  public class ClassController : ControllerBase
  {

    private readonly DatabaseContext _context;

    public ClassController(DatabaseContext context)
    {
      _context = context;
    }

    // GET: api/Class (get all classes)
    [HttpGet]

    public async Task<ActionResult<List<Class>>> GetClasses()
    {

      return await _context.Classes.Include(s => s.Students).ToListAsync();
    }

    // get one class based on classId
    [HttpGet("{id}")]
    public async Task<ActionResult<Class>> GetClass(int id)
    {
      var singleClass = await _context.Classes.FindAsync(id);

      if (singleClass == null)
      {
        return NotFound();
      }

      return singleClass;
    }

    [HttpPost("{teacherId}")]
    public async Task<ActionResult<Class>> PostClass([FromRoute] int teacherId, Class newClass)
    {
      var currentTeacherName = User.Identity.Name;
      var currentTeacher = _context.Teachers.FirstOrDefault(t => t.UserName == currentTeacherName);
      var exists = _context.Teachers.Any(teacher => teacher.Id == teacherId);
      if (!exists)
      {
        return NotFound();
      }
      else
      {

        await _context.Classes.AddAsync(newClass);
        await _context.SaveChangesAsync();
        return Ok(newClass);
      }


    }

    // DELETE: api/class/5
    [HttpDelete("{id}")]
    public async Task<ActionResult<Class>> DeleteClass(int id)
    {
      var singleClass = await _context.Classes.FindAsync(id);
      if (singleClass == null)
      {
        return NotFound();
      }

      _context.Classes.Remove(singleClass);
      await _context.SaveChangesAsync();

      return singleClass;
    }
  }
}