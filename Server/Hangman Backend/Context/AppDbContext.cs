using Hangman_Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Hangman_Backend.Context
{
    public class AppDbContext: DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) 
        { 
        }

        public DbSet<User> Users { get; set; }
        public DbSet<UserStatistics> UserStatistics { get; set; }   

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("users");
            modelBuilder.Entity<UserStatistics>().ToTable("statistics");
        }
    }
}
