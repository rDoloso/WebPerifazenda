using System.ComponentModel.DataAnnotations;

namespace WebPerifaZenda.Models
{
    public class CadastrarViewModel
    {
        [Required(ErrorMessage = "O nome completo é obrigatório.")]
        public string Nome { get; set; }

        [Required(ErrorMessage = "O CPF é obrigatório.")]
        public string Cpf { get; set; }

        [Required(ErrorMessage = "O email é obrigatório.")]
        [EmailAddress(ErrorMessage = "O email não é válido.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "A senha é obrigatória.")]
        [DataType(DataType.Password)]
        public string Senha { get; set; }

        [Required(ErrorMessage = "A confirmação da senha é obrigatória.")]
        [DataType(DataType.Password)]
        [Compare("Senha", ErrorMessage = "As senhas não coincidem.")]
        public string ConfirmacaoSenha { get; set; }

        [Required(ErrorMessage = "A data de nascimento é obrigatória.")]
        public DateTime DataNascimento { get; set; }



    }


    public class LoginViewModel
    {
        [Required(ErrorMessage = "O usuário é obrigatório.")]
        public string Usuario { get; set; }

        [Required(ErrorMessage = "A senha é obrigatória.")]
        [DataType(DataType.Password)]
        public string Senha { get; set; }
    }


}
