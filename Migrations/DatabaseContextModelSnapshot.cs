﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using templatetestjuly1st;

namespace sdgreacttemplate.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    partial class DatabaseContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn)
                .HasAnnotation("ProductVersion", "2.2.0-rtm-35687")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("TemplateTestJuly1st.Models.Student", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Age");

                    b.Property<string>("FirstName");

                    b.Property<string>("Grade");

                    b.Property<string>("LastName");

                    b.Property<string>("StudentNumber");

                    b.HasKey("Id");

                    b.ToTable("Students");
                });

            modelBuilder.Entity("TemplateTestJuly1st.Models.StudentCheckIn", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("IsCheckedIn");

                    b.Property<int>("StudentId");

                    b.Property<int?>("TeacherId");

                    b.Property<DateTime>("TimeCheckedIn");

                    b.HasKey("Id");

                    b.HasIndex("StudentId");

                    b.HasIndex("TeacherId");

                    b.ToTable("StudentCheckIns");
                });

            modelBuilder.Entity("TemplateTestJuly1st.Models.Teacher", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClassName");

                    b.Property<string>("Email");

                    b.Property<string>("FullName");

                    b.Property<string>("PasswordHash");

                    b.Property<string>("UserName");

                    b.HasKey("Id");

                    b.ToTable("Teachers");
                });

            modelBuilder.Entity("TemplateTestJuly1st.Models.StudentCheckIn", b =>
                {
                    b.HasOne("TemplateTestJuly1st.Models.Student", "Student")
                        .WithMany("StudentCheckIns")
                        .HasForeignKey("StudentId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("TemplateTestJuly1st.Models.Teacher", "Teacher")
                        .WithMany()
                        .HasForeignKey("TeacherId");
                });
#pragma warning restore 612, 618
        }
    }
}
