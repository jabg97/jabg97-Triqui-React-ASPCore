using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace ApiTriqui.Models
{
    public partial class TriquiAPIContext : DbContext
    {
        public TriquiAPIContext()
        {
        }

        public TriquiAPIContext(DbContextOptions<TriquiAPIContext> options)
            : base(options)
        {
        }

        public virtual DbSet<TiposIdentificacion> TiposIdentificacion { get; set; }
        public virtual DbSet<Usuarios> Usuarios { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TiposIdentificacion>(entity =>
            {
                entity.ToTable("Tipos_identificacion");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Codigo).HasMaxLength(2);

                entity.Property(e => e.Nombre).HasMaxLength(50);
            });

            modelBuilder.Entity<Usuarios>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Apellido).HasMaxLength(50);

                entity.Property(e => e.CantGanados).HasColumnName("Cant_ganados");

                entity.Property(e => e.CantPerdidos).HasColumnName("Cant_perdidos");

                entity.Property(e => e.Contrasena).HasMaxLength(255);

                entity.Property(e => e.Email).HasMaxLength(100);

                entity.Property(e => e.Nombre).HasMaxLength(50);

                entity.Property(e => e.NumeroIdentificacion).HasColumnName("Numero_identificacion");

                entity.Property(e => e.TipoIdentificacionId).HasColumnName("Tipo_identificacionID");

                entity.HasOne(d => d.TipoIdentificacion)
                    .WithMany(p => p.Usuarios)
                    .HasForeignKey(d => d.TipoIdentificacionId)
                    .HasConstraintName("FK__Usuarios__Tipo_i__25869641");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
