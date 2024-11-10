using Microsoft.AspNetCore.Mvc;

namespace WebApp.Controllers
{
    public class HomeController : Controller
    {
        // Ação que renderiza a página inicial
        public IActionResult Index()
        {
            return View(); // Retorna a view Index.cshtml
        }

        public IActionResult Privacy()
        {
            return View();
        }
    }
}
