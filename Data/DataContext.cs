using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using EusaHotDeskBooking.Modal;

namespace EusaHotDeskBooking.Data
{
    public class DataContext : DbContext
    {


        public DataContext(DbContextOptions<DataContext> options) : base(options) { }


        public DbSet<Desk> Desks { get; set; }

        public DbSet<User> Users { get; set; }


        public DbSet<Agreement> Agreements { get; set; }
        public DbSet<DeskLocation> DeskLocations { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLazyLoadingProxies();

        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

         
            base.OnModelCreating(modelBuilder);


            modelBuilder.Entity<Desk>(d => d.HasKey(k => k.Id)           
            );
            modelBuilder.Entity<Agreement>(d => d.HasKey(k => k.Id)
           );
            modelBuilder.Entity<User>(d => d.HasKey(k => k.Id)
            );
            modelBuilder.Entity<DeskLocation>(d => d.HasKey(k => k.Id)
            );
            modelBuilder.Entity<Desk>(d => d.HasOne(k => k.Bookby)
            );
            modelBuilder.Entity<Desk>(d => d.HasOne(k => k.location)

            );
            modelBuilder.Entity<Desk>().HasIndex(i => new { i.Bookedto, i.locationId }).IsUnique();
            modelBuilder.Entity<DeskLocation>(d => d.HasMany(k => k.desks)
           );

        }

    }
}
