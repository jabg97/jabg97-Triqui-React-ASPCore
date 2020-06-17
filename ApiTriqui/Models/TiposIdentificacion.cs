using System;
using System.Collections.Generic;

namespace ApiTriqui.Models
{
    public partial class TiposIdentificacion
    {
        public TiposIdentificacion()
        {
            Usuarios = new HashSet<Usuarios>();
        }

        public int Id { get; set; }
        public string Codigo { get; set; }
        public string Nombre { get; set; }

        public virtual ICollection<Usuarios> Usuarios { get; set; }
    }
}
