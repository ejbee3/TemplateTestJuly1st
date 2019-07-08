using System;

namespace TemplateTestJuly1st.Models
{
  public class StudentCheckIn
  {
    public int Id { get; set; }
    public DateTime TimeCheckedIn { get; set; } = DateTime.Now;

    public int StudentId { get; set; }
    public Student Student { get; set; }

    // who checked in this member

    public int? TeacherId { get; set; }
    public Teacher Teacher { get; set; }
  }
}