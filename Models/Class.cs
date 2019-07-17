using System.Collections.Generic;

namespace TemplateTestJuly1st.Models
{
  public class Class
  {
    public int Id { get; set; }
    public string Grade { get; set; }
    public string Subject { get; set; }

    public int? TeacherId { get; set; }
    public Teacher Teacher { get; set; }
    public List<Student> Students { get; set; } = new List<Student>();
  }
}