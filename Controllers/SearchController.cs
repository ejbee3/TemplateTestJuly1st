using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TemplateTestJuly1st.Models;
using templatetestjuly1st;

namespace sdg_react_template.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class SearchController : ControllerBase
  {

    private DatabaseContext _context;

    public SearchController(DatabaseContext context)
    {
      this._context = context;
    }

    [HttpGet("students")]
    public async Task<List<Student>> SearchStudents([FromQuery]string searchTerm)
    {
      var results = _context
      .Students
      .Where(w => w.FirstName.ToLower().Contains(searchTerm.ToLower()) || w.LastName.ToLower().Contains(searchTerm.ToLower()));
      return await results.ToListAsync();
    }
  }
}