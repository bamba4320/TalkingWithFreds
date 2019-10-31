use TalkingWithFreds

-- create tables and add constraints

-- create Users table
create table Users(
					u_id       int identity(1,1) not null, 
					u_username nvarchar(30),
					u_password nvarchar(30),
					u_email	   nvarchar(30),
					u_nickname nvarchar(30),
)
go

-- add constraints
alter table Users add constraint pk_u_id primary key (u_id)   
go

-- create Conversations table
create table Conversations(
					conv_id   int identity(1,1) not null,
					is_group  bit,
					conv_name nvarchar(30),
)
go

-- add constraints
alter table Conversations add constraint pk_conv_id primary key (conv_id)
go

-- create Messages table
create table ConvMessages(
					message_id           int identity(1,1) not null,
					sender_id            int not null,
					conv_id              int not null,
					message_sending_time datetime not null,
					message_content      nvarchar(200),
)
go

-- add constraints
alter table ConvMessages add constraint pk_message_id primary key (message_id)
alter table ConvMessages add constraint fk_conv_id    foreign key (conv_id)   references Conversations (conv_id) 
alter table ConvMessages add constraint fk_sender_id  foreign key (sender_id) references Users (u_id) 
go

-- create UserInConversation table
create table UserInConversation(
					conv_id  int not null,
					u_id     int not null,
					is_admin bit
)
go

-- add constraints
alter table UserInConversation add constraint pk_u_and_conv_id primary key (conv_id, u_id)
alter table UserInConversation add constraint fk_curr_conv_id foreign key (conv_id) references Conversations(conv_id)
alter table UserInConversation add constraint fk_u_id foreign key (u_id) references Users(u_id)
go