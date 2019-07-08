using TemplateTestJuly1st.Models;

namespace TemplateTestJuly1st.ViewModel
{
  public class AuthData
  {
    public string Token { get; set; }
    public long TokenExpirationTime { get; set; }
    public int Id { get; set; }
    public Teacher Teacher { get; set; }
  }
}