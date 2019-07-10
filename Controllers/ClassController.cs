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

    // GET: api/Class
    [HttpGet]

    public async Task<ActionResult<List<Class>>> GetClasses()
    {
      return await _context.Classes.ToListAsync();
    }
  }
}