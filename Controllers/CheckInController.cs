
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
  public class CheckInController : ControllerBase
  {

    private DatabaseContext _context;

    public CheckInController(DatabaseContext context)
    {
      this._context = context;
    }

    [HttpPost("{studentId}")]
    public async Task<ActionResult> CheckInStudent([FromRoute]int studentId)
    {
      // var currentTeacherName = Teacher.Identity.Name;
      // var currentTeacher = _context.Teachers.FirstOrDefault(t => t.UserName == currentTeacherName);
      var exists = _context.Students.Any(student => student.Id == studentId);
      if (!exists)
      {
        return NotFound();
      }
      else
      {
        var checkIn = new StudentCheckIn
        {
          StudentId = studentId
        };
        await _context.StudentCheckIns.AddAsync(checkIn);
        await _context.SaveChangesAsync();
        return Ok();
      }
    }
  }
}


