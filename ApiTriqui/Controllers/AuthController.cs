using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ApiTriqui.Models;
using Microsoft.EntityFrameworkCore;

namespace ApiTriqui.Controllers
{
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly TriquiAPIContext _context;

        public AuthController(TriquiAPIContext context)
        {
            _context = context;
        }

        // POST: api/Auth/Register
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        [Route("api/[controller]/Register")]
        public async Task<ActionResult<Usuarios>> Register([FromBody]Usuarios usuario)
        {
            try
            {
                if (usuario.Nombre.Equals("") || usuario.Apellido.Equals("") ||
                    usuario.Email.Equals("") || usuario.Contrasena.Equals("") ||
                    usuario.TipoIdentificacionId.Equals("") || usuario.NumeroIdentificacion.Equals(""))
                {
                    return new JsonResult(new { status = 400 });
                }
                this._context.Entry(usuario).State = EntityState.Added;
                this._context.SaveChanges();
                return new JsonResult(new { status = 200, result = usuario });
            }
            catch (Exception ex)
            {
                return new JsonResult(new { status = 500, message = ex.Message });
            }
          
        }

        // POST: api/Auth/Login
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        [Route("api/[controller]/Login")]
        public async Task<ActionResult<Usuarios>> Login([FromBody]Usuarios usuario)
        {
            try
            {
                if (usuario.Email.Equals("") || usuario.Contrasena.Equals(""))
                {
                    return new JsonResult(new { status = 400 });
                }
                var data = this._context.Usuarios.Where(user => user.Email.Equals(usuario.Email) && user.Contrasena.Equals(usuario.Contrasena));
                if (data.Count() > 0)
                {
                    return new JsonResult(new { status = 200, result = data });
                }
                else
                {
                    return new JsonResult(new { status = 404, message = "Usuario o Contraseña Incorrectos" });
                }
                
            }
            catch (Exception ex)
            {
                return new JsonResult(new { status = 500, message = ex.Message });
            }

        }
    }
}