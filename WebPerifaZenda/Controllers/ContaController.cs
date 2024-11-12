using Microsoft.AspNetCore.Mvc;
using WebPerifaZenda.Models;
using System.Threading.Tasks;
using System;
using System.Net.Http;
using System.Text;
using Newtonsoft.Json;

namespace WebPerifaZenda.Controllers
{
    public class ContaController : Controller
    {
              public IActionResult Cadastrar()
        {
            return View();
        }

        
        public IActionResult Login()
        {
            return View();
        }
    }
}
