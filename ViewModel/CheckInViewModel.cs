using System;

namespace TemplateTestJuly1st.ViewModel
{
  public class CheckInViewModel
  {
    public int Id { get; set; }
    public DateTime TimeCheckedIn { get; set; }
    public bool IsCheckedIn { get; set; }
    public int StudentId { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public int? ClassId { get; set; }
  }
}
