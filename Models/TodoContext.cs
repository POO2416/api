using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql;
using Microsoft.EntityFrameworkCore.Metadata;

namespace retrieve_data.Models
{
    public partial  class TodoContext : DbContext
    {
        public TodoContext(DbContextOptions<TodoContext> options)
          : base(options)
        {
        }

        public DbSet<TodoItems> TodoItemss { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseMySql("server=172.16.18.2;database=todolist;user=srinath;password=test123;treattinyasboolean=true", Microsoft.EntityFrameworkCore.ServerVersion.FromString("10.5.8-mariadb"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TodoItems>(entity =>
            {
                //entity.HasNoKey();

                entity.ToTable("todoitems");

                entity.Property(e => e.Id).HasColumnType("int(11)");

                entity.Property(e => e.Name)
                    .HasColumnType("varchar(45)")
                    .HasColumnName("Name")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.Secret)
                    .HasColumnType("varchar(45)")
                    .HasColumnName("Secret")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                //entity.Property(e => e.State).HasColumnType("int(11)");


                entity.Property(e => e.Dep)
                   .HasColumnType("varchar(45)")
                   .HasColumnName("Dep")
                   .HasCharSet("utf8")
                   .HasCollation("utf8_general_ci");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
    
