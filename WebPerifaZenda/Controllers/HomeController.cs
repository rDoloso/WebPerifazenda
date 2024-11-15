using Microsoft.AspNetCore.Mvc;

namespace WebApp.Controllers
{
    public class HomeController : Controller
    {
        // A��o que renderiza a p�gina inicial
        public IActionResult Index()
        {
            ViewBag.SuccessMessage = TempData["SuccessMessage"];

            return View(); // Retorna a view Index.cshtml
        }

        public IActionResult Privacy()
        {
            return View();
        }
    }
}
