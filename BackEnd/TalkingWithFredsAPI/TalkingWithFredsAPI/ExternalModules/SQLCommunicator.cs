using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Data.OleDb;
using System.Data;

namespace TalkingWithFreds.API.ExternalModules
{
    public class SQLCommunicator
    {
        public static SqlConnection Connection;
        public static DataSet Ds;
        public static SqlDataAdapter Adapter;
        public static SqlCommand SqlCommand;
        public static SqlDataReader Reader;
        
        /// <summary>
        /// init sql connection
        /// </summary>
        /// <param name="ConnectionString"> sql connection string </param>
        public static void InitConnection(string ConnectionString)
        {
            Connection = new SqlConnection();
            Connection.ConnectionString = ConnectionString;
            Ds = new DataSet();
        }

        /// <summary>
        /// SQL Select Statment
        /// </summary>
        /// <param name="fields">what fields to select</param>
        /// <param name="tables">from which tables to select</param>
        /// <param name="where"> filters </param>
        /// <returns></returns>
        public static DataSet Select(string fields, string tables, string where)
        {
            try
            {
                Ds.Clear();
                Connection.Open();
                SqlCommand = new SqlCommand($"select {fields} from {tables} {where}", Connection);
                Adapter = new SqlDataAdapter(SqlCommand);
                Adapter.Fill(Ds);
                Connection.Close();
                return Ds;
            }
            catch (Exception ex) { throw ex; }
        }

        /// <summary>
        /// SQL insert statment
        /// </summary>
        /// <param name="table">what table to insert to</param>
        /// <param name="values"> what values to insert</param>
        public static void Insert(string table, string values)
        {
            try
            {
                Connection.Open();
                SqlCommand = new SqlCommand($"insert into {table} values({ values })", Connection);
                Reader = SqlCommand.ExecuteReader(CommandBehavior.CloseConnection);
                Connection.Close();
            }
            catch (Exception ex) { throw ex; }
        }

        /// <summary>
        /// SQL update statment for a single field
        /// </summary>
        /// <param name="table"> what table to update</param>
        /// <param name="field"> what field to update</param>
        /// <param name="value"> what value to insert</param>
        /// <param name="where"> filters</param>
        public static void Update(string table, string field, string value, string where)
        {
            try
            {
                Connection.Open();
                SqlCommand = new SqlCommand($"update {table} set {field} = {value} {where}", Connection);
                Reader = SqlCommand.ExecuteReader(CommandBehavior.CloseConnection);
                Connection.Close();
            }
            catch (Exception ex) { throw ex; }
        }

        /// <summary>
        /// SQL delete statment
        /// </summary>
        /// <param name="table"> what table to delete in</param>
        /// <param name="where"> filters</param>
        public static void Delete(string table, string where)
        {
            {
                try
                {
                    Connection.Open();
                    SqlCommand = new SqlCommand($"delete from {table} {where}", Connection);
                    Reader = SqlCommand.ExecuteReader(CommandBehavior.CloseConnection);
                    Connection.Close();
                }
                catch (Exception ex) { throw ex; }
            }
        }
    }
}
