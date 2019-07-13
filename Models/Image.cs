using System;

namespace TemplateTestJuly1st.Models
{
  public class Image
  {
    public int Id { get; set; }
    public string Url { get; set; }
    public DateTime Created { get; set; } = DateTime.Now;
  }
}