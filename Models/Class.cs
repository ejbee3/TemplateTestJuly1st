using System.Collections.Generic;

namespace TemplateTestJuly1st.Models
{
  public class Class
  {
    public int Id { get; set; }
    public string ClassName { get; set; }

    public int? TeacherId { get; set; }
    public Teacher Teacher { get; set; }
    public List<Student> Students { get; set; }
  }
}