﻿// <auto-generated />
using System;
using EusaHotDeskBooking.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace EusaHotDeskBooking.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20200827130455_UpdateEusaHostDesk-27082020")]
    partial class UpdateEusaHostDesk27082020
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.7")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("EusaHotDeskBooking.Modal.Desk", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("BookbyId")
                        .HasColumnType("int");

                    b.Property<DateTime?>("Bookedfrom")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("Bookedto")
                        .HasColumnType("datetime2");

                    b.Property<bool>("Isarchived")
                        .HasColumnType("bit");

                    b.Property<int?>("locationId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("BookbyId");

                    b.HasIndex("locationId");

                    b.ToTable("Desks");
                });

            modelBuilder.Entity("EusaHotDeskBooking.Modal.DeskLocation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("ECCDesk")
                        .HasColumnType("bit");

                    b.Property<string>("Floor")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("Isbooked")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("DeskLocations");
                });

            modelBuilder.Entity("EusaHotDeskBooking.Modal.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("DisplayName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("avatar")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("EusaHotDeskBooking.Modal.Desk", b =>
                {
                    b.HasOne("EusaHotDeskBooking.Modal.User", "Bookby")
                        .WithMany()
                        .HasForeignKey("BookbyId");

                    b.HasOne("EusaHotDeskBooking.Modal.DeskLocation", "location")
                        .WithMany("desks")
                        .HasForeignKey("locationId");
                });
#pragma warning restore 612, 618
        }
    }
}
