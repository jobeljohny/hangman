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
        public DbSet<GameSession> gameSessions { get; set; }     
        public DbSet<movieFetcher> movieFetcher { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("users");
            modelBuilder.Entity<UserStatistics>().ToTable("statistics");
            modelBuilder.Entity<GameSession>().ToTable("gameSessions");
            modelBuilder.Entity<movieFetcher>().ToTable("movies");
        }
    }
}
