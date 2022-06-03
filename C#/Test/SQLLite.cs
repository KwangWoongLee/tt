using System;
using System.Collections.Generic;
using System.Text;

//SQLite 사용
using System.Data.SQLite;
using System.IO;

namespace Test
{
    public class Item {
        public string no;
        public long my_price;
        public long option_min_price;
        public long price_gap;
        public string link;
        public long now_min_price;
    }
    class SQLLite
    {
        SQLiteConnection _conn;
        public bool Init(string id, string password) {
            string filePath = @"..\..\..\db\auth.db";
            string strConn = $"Data Source={filePath}";

            SQLiteDataReader? rdr = null;
            try
            {

                _conn = new SQLiteConnection(strConn);
                _conn.Open();

                string sql = $"SELECT * FROM login Where id = '{id}' and password = '{password}';";

                //SQLiteDataReader를 이용하여 연결 모드로 데이타 읽기
                SQLiteCommand cmd = new SQLiteCommand(sql, _conn);
                rdr = cmd.ExecuteReader();

                if (!rdr.HasRows)
                {
                    //로그인 실패처리
                    return false;
                }

                //로그인 성공 처리
                return true;
            }
            catch
            {
                return false;
            }
            finally {
                if(rdr != null)
                    rdr.Close();
            }

        }

        public long GetTimer(string projectName)
        {
            long time = 0;
            SQLiteDataReader? rdr = null;
            try
            {

                string sql = $"SELECT * FROM timer Where name = '{projectName}';";

                //SQLiteDataReader를 이용하여 연결 모드로 데이타 읽기
                SQLiteCommand cmd = new SQLiteCommand(sql, _conn);
                rdr = cmd.ExecuteReader();

                if (rdr.HasRows)
                {
                   rdr.Read();
                   time = (long)rdr["time"];
                }

                return time;
            }
            catch
            {
                return time;
            }
            finally
            {
                if (rdr != null)
                    rdr.Close();
            }

        }
        public void Close()
        {
            _conn.Close();
        }

        public List<Item> GetList() {
            SQLiteDataReader? rdr = null;

            List<Item> l = new List<Item>();
            string sql = $"SELECT * FROM project1;";

            try
            {
                //SQLiteDataReader를 이용하여 연결 모드로 데이타 읽기
                SQLiteCommand cmd = new SQLiteCommand(sql, _conn);
                rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    string no = (string)rdr["no"];
                    string link = (string)rdr["link"];
                    long min_price = (long)rdr["min_price"];
                    long price_gap = (long)rdr["price_gap"];
                    long my_price = (long)rdr["my_price"];
                    var item = new Item();
                    item.no = no;
                    item.link = link;
                    item.option_min_price = min_price;
                    item.price_gap = price_gap;
                    item.my_price = my_price;

                    l.Add(item);
                }

                return l;
            }
            catch (Exception e)
            {
                Console.WriteLine($"{e.ToString()}");
                return null;
            }
            finally
            {
                if (rdr != null)
                    rdr.Close();
            }
        }
    }
}
