using Microsoft.AspNetCore.Mvc;
using WebPerifaZenda.Models;

namespace WebPerifaZenda.Controllers
{
    public class ContaController : Controller
    {
        // Página de cadastro (GET)
        public IActionResult Cadastrar()
        {
            return View();
        }

        public IActionResult Login()
        {
            return View();
        }

        // Processar o cadastro (POST)
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Cadastrar(CadastrarViewModel model)
        {
            if (ModelState.IsValid)
            {
                // Lógica de cadastro do usuário (salvar no banco de dados)

                // Exemplo de salvar no banco de dados usando o seu serviço
                // _usuarioService.Cadastrar(model);

                TempData["SuccessMessage"] = "Cadastro realizado com sucesso!";
                return RedirectToAction("Index", "Home"); // Redireciona para a página inicial após o cadastro
            }

            // Se o modelo for inválido, retorna a mesma view com erros
            return View(model);
        }
    }
}
