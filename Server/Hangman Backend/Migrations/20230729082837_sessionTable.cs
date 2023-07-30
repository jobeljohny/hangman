using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hangman_Backend.Migrations
{
    /// <inheritdoc />
    public partial class sessionTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "gameSessions",
                columns: table => new
                {
                    Username = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    isPlaying = table.Column<bool>(type: "bit", nullable: false),
                    MovieName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Movie = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Template = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    isNumber = table.Column<bool>(type: "bit", nullable: true),
                    lives = table.Column<int>(type: "int", nullable: true),
                    score = table.Column<float>(type: "real", nullable: true),
                    round = table.Column<int>(type: "int", nullable: true),
                    errorBuffer = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    startTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    endTime = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_gameSessions", x => x.Username);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "gameSessions");
        }
    }
}
