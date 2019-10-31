using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace TalkingWithFredsAPI.Models
{
    public partial class TalkingWithFredsContext : DbContext
    {
        public TalkingWithFredsContext()
        {
        }

        public TalkingWithFredsContext(DbContextOptions<TalkingWithFredsContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Conversations> Conversations { get; set; }
        public virtual DbSet<ConvMessages> ConvMessages { get; set; }
        public virtual DbSet<UserInConversation> UserInConversation { get; set; }
        public virtual DbSet<Users> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=DESKTOP-N7FPIC6;Database=TalkingWithFreds;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Conversations>(entity =>
            {
                entity.HasKey(e => e.ConvId);

                entity.Property(e => e.ConvId).HasColumnName("conv_id");

                entity.Property(e => e.ConvName)
                    .HasColumnName("conv_name")
                    .HasMaxLength(30);

                entity.Property(e => e.IsGroup).HasColumnName("is_group");
            });

            modelBuilder.Entity<ConvMessages>(entity =>
            {
                entity.HasKey(e => e.MessageId);

                entity.Property(e => e.MessageId).HasColumnName("message_id");

                entity.Property(e => e.ConvId).HasColumnName("conv_id");

                entity.Property(e => e.MessageContent)
                    .HasColumnName("message_content")
                    .HasMaxLength(200);

                entity.Property(e => e.MessageSendingTime)
                    .HasColumnName("message_sending_time")
                    .HasColumnType("datetime");

                entity.Property(e => e.SenderId).HasColumnName("sender_id");

                entity.HasOne(d => d.Conv)
                    .WithMany(p => p.ConvMessages)
                    .HasForeignKey(d => d.ConvId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_conv_id");

                entity.HasOne(d => d.Sender)
                    .WithMany(p => p.ConvMessages)
                    .HasForeignKey(d => d.SenderId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_sender_id");
            });

            modelBuilder.Entity<UserInConversation>(entity =>
            {
                entity.HasKey(e => new { e.ConvId, e.UId });

                entity.Property(e => e.ConvId).HasColumnName("conv_id");

                entity.Property(e => e.UId).HasColumnName("u_id");

                entity.Property(e => e.IsAdmin).HasColumnName("is_admin");

                entity.HasOne(d => d.Conv)
                    .WithMany(p => p.UserInConversation)
                    .HasForeignKey(d => d.ConvId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_curr_conv_id");

                entity.HasOne(d => d.U)
                    .WithMany(p => p.UserInConversation)
                    .HasForeignKey(d => d.UId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_u_id");
            });

            modelBuilder.Entity<Users>(entity =>
            {
                entity.HasKey(e => e.UId);

                entity.Property(e => e.UId).HasColumnName("u_id");

                entity.Property(e => e.UEmail)
                    .HasColumnName("u_email")
                    .HasMaxLength(30);

                entity.Property(e => e.UNickname)
                    .HasColumnName("u_nickname")
                    .HasMaxLength(30);

                entity.Property(e => e.UPassword)
                    .HasColumnName("u_password")
                    .HasMaxLength(30);

                entity.Property(e => e.UUsername)
                    .HasColumnName("u_username")
                    .HasMaxLength(30);
            });
        }
    }
}
