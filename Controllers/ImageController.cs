using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using content.ImageHelper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using TemplateTestJuly1st.Models;


namespace content.Controllers
{
  [Route("api/[controller]")]
  public class ImageController : Controller
  {

    private readonly IImageHandler _imageHandler;
    private readonly IOptions<content.Helpers.CloudinaryKeys> _options;

    public ImageController(IImageHandler imageHandler, IOptions<content.Helpers.CloudinaryKeys> options)
    {
      _imageHandler = imageHandler;
      _options = options;
      Console.WriteLine(_options.Value.CloudName);

    }

    /// <summary>
    /// Uploads an image to the server.
    /// </summary>
    /// <param name="file"></param>
    /// <returns></returns>
    [HttpPost]
    public async Task<ActionResult> UploadImage(IFormFile file)
    {

      var path = await _imageHandler.UploadImage(file);
      var rv = new content.Helpers.CloudinaryStorage(_options.Value).UploadFile(path);
      // TODO: add to database
      var image = new Image
      {
        Url = rv.SecureUri.AbsoluteUri
      };
      await _imageHandler.DeleteFile(path);

      return Ok(new { path, image });
    }


  }
}