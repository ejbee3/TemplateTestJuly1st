using System;
using System.Collections.Generic;

namespace TemplateTestJuly1st.Models
{
  public class Student
  {
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Age { get; set; }

    public string StudentNumber { get; set; }
    public Class Class { get; set; }
    public int? ClassId { get; set; }
    public List<StudentCheckIn> StudentCheckIns { get; set; } = new List<StudentCheckIn>();
  }
}