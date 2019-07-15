
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TemplateTestJuly1st.Models;
using templatetestjuly1st;
using TemplateTestJuly1st.ViewModel;

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


    [HttpGet("all")]

    public async Task<ActionResult<List<CheckInViewModel>>> GetCheckIns()
    {
      var checkInList = _context.StudentCheckIns.Include(s => s.Student);

      return await checkInList.Select(s => new CheckInViewModel
      {
        Id = s.Id,
        TimeCheckedIn = s.TimeCheckedIn,
        IsCheckedIn = s.IsCheckedIn,
        StudentId = s.StudentId,
        FirstName = s.Student.FirstName,
        LastName = s.Student.LastName,
        ClassId = s.Student.ClassId

      }).ToListAsync();

    }

    [HttpPost("{studentId}")]
    public async Task<ActionResult> CheckInStudent([FromRoute]int studentId)
    {
      var currentTeacherName = User.Identity.Name;
      var currentTeacher = _context.Teachers.FirstOrDefault(t => t.UserName == currentTeacherName);
      var exists = _context.Students.Any(student => student.Id == studentId);
      var currentStudent = _context.Students.FirstOrDefault(s => s.Id == studentId);
      if (!exists)
      {
        return NotFound();
      }
      else
      {
        var checkIn = new StudentCheckIn
        {
          StudentId = studentId,
          TeacherId = currentTeacher.Id,
          Student = currentStudent
        };
        await _context.StudentCheckIns.AddAsync(checkIn);
        await _context.SaveChangesAsync();
        return Ok(checkIn);
      }
    }

    [HttpPost("absent/{studentId}")]

    public async Task<ActionResult> LogAbsent([FromRoute] int studentId)
    {
      var currentTeacherName = User.Identity.Name;
      var currentTeacher = _context.Teachers.FirstOrDefault(t => t.UserName == currentTeacherName);
      var exists = _context.Students.Any(student => student.Id == studentId);
      var currentStudent = _context.Students.Include(c => c.StudentCheckIns).FirstOrDefault(s => s.Id == studentId);

      if (!exists)
      {
        return NotFound();
      }
      else
      {
        var Absent = new StudentCheckIn
        {
          StudentId = studentId,
          TeacherId = currentTeacher.Id,
          IsCheckedIn = false,
          Student = currentStudent
        };
        await _context.StudentCheckIns.AddAsync(Absent);
        await _context.SaveChangesAsync();
        return Ok(Absent);
      }
    }
  }
}


