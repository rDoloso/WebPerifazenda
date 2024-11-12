using Microsoft.AspNetCore.Mvc;

namespace WebPerifaZenda.Controllers
{
    public class ProdutoController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Carrinho()
        {
            return View();
        }
    }
}
