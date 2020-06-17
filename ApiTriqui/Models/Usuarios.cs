using System;
using System.Collections.Generic;

namespace ApiTriqui.Models
{
    public partial class Usuarios
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Email { get; set; }
        public string Contrasena { get; set; }
        public int? TipoIdentificacionId { get; set; }
        public int? NumeroIdentificacion { get; set; }
        public int? CantGanados { get; set; }
        public int? CantPerdidos { get; set; }

        public virtual TiposIdentificacion TipoIdentificacion { get; set; }
    }
}
