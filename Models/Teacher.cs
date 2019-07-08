using System;

namespace TemplateTestJuly1st.Models
{
  public class Teacher
  {
    public static object Identity { get; internal set; }
    public int Id { get; set; }

    public string UserName { get; set; }
    public string PasswordHash { get; set; }

    public string FullName { get; set; }
    public string ClassName { get; set; }
    public string Email { get; set; }


  }
}