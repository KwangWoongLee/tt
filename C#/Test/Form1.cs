using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Test
{
    public partial class Form1 : Form
    {
        SQLLite _db;
        Selenium _selenium;
        string? _id = null;
        string? _password = null;
        List<Item> _items;
        long _time = 0;

        public Form1(string[] args)
        {
            InitializeComponent();
            try
            {

                if (args.Length > 1)
                {
                    for (int i = 0; i < args.Length; i++)
                    {
                        _id = args[1];
                        _password = args[2];
                    }
                }
                else
                {
                    throw new Exception("올바르지 않은 id, password입니다.");
                }

                _db = new SQLLite();

                //로그인
                if (!_db.Init(_id, _password))
                {
                    throw new Exception("올바르지 않은 id, password입니다.");
                }

                /*
                 Selenium 클래스 사용방법
                Selenium 객체를 생성합니다.
                Selenium 객체의 Init() 메소드를 호출합니다. 인자는 String(url) 과 ChromeOptions 입니다.

                최초 페이지가 열리며, 이후 동작을 나열하시면 됩니다.

                 */
                _selenium = new Selenium();


                ChromeOptions options = new ChromeOptions();
                options.AddArgument("headless");

                _selenium.Init(options);


                _items = _db.GetList();
                if (_items != null && _items.Count > 0)
                {
                    GetMinPrice(_items);

                    richTextBox1.AppendText($"각 상품번호 별 등록된 링크의 현재 최저가 리스트입니다.\n");
                    foreach (var item in _items)
                    {
                        richTextBox1.AppendText($"상품번호 : {item.no} , 최저가 : {item.now_min_price}\n");
                    }
                    richTextBox1.AppendText($"---------------------------------------\n");
                }
                else
                {
                    throw new Exception("아이템 리스트가 없습니다. 3초후 자동 종료됩니다.");
                }

            }
            catch (Exception e)
            {
                richTextBox1.AppendText($"Error : { e.ToString()}");
                
                //3초 후 자동 종료
                Thread.Sleep(3000);
                Environment.Exit(0);
            }
            finally
            {
                _selenium.Close();
            }
            
        }

        private void ChangePrice() {
            richTextBox1.AppendText($"가격 조정을 시작합니다.\n");

            foreach (var item in _items)
            {
                if (item.link == "") continue;

                _selenium.LocationUrl("https://nid.naver.com/nidlogin.login?url=https%3A%2F%2Fsell.smartstore.naver.com%2F%23%2FnaverLoginCallback%3Furl%3Dhttps%253A%252F%252Fsell.smartstore.naver.com%252F%2523");

                _selenium.SendKeyId("id", _id);
                _selenium.SendKeyId("pw", _password);
                _selenium.ClickById("log.login");

                _selenium.ClickByXPath("/html/body/div[1]/div/div/div[1]/button");

                _selenium.ClickByXPath("//*[@id='seller-lnb']/div/div[1]/ul/li[1]/a");
                _selenium.ClickByXPath("//*[@id='seller-lnb']/div/div[1]/ul/li[1]/ul/li[1]/a");


                _selenium.ClickByXPath("//*[@id='seller-content']/ui-view/div/ui-view[1]/div[1]/ul/li[3]/a");

                if (item.my_price <= item.now_min_price)
                {
                    richTextBox1.AppendText($"상품번호 {item.no}의 가격이 현재 최저가이기 때문에, 넘어갑니다. \n");
                    continue;
                }

                if (item.option_min_price <= item.now_min_price - item.price_gap)
                {
                    string no = item.no;

                    
                    _selenium.SendKeyByXPath("//*[@id='seller-content']/ui-view/div/ui-view[1]/div[2]/form/div[1]/div/ul/li[1]/div/div/div[2]/textarea", no);

                    _selenium.ClickEnter("//*[@id='seller-content']/ui-view/div/ui-view[1]/div[2]/form/div[2]/div/button[1]");


                    _selenium.ClickByXPath("//*[@id='seller-content']/ui-view/div/ui-view[2]/div[1]/div[2]/div[3]/div/div/div/div/div[3]/div[1]/div/div[1]/div/span[1]/i[2]");


                    _selenium.ClickByXPath("//*[@id='seller-content']/ui-view/div/ui-view[2]/div[1]/div[2]/div[3]/div/div/div/div/div[3]/div[1]/div[1]/div[2]/span/button");

                    _selenium.ClearId("prd_price2");
                    _selenium.SendKeyId("prd_price2", (item.now_min_price - item.price_gap).ToString());

                    //_selenium.ClickEnter("//*[@id='seller-content']/ui-view/div[3]/div[2]/div[1]/button[2]");

                    richTextBox1.AppendText($"상품번호 {item.no}의 가격이 {item.now_min_price - item.price_gap} 로 새로 설정되었습니다.\n");
                }
                else
                {
                    richTextBox1.AppendText($"상품번호 {item.no}의 가격이 설정한 최저가 {item.option_min_price}보다 낮아질 수 없어 기존 가격이 유지됩니다.\n \n");
                }
            }
        }

        private void button3_Click(object sender, EventArgs e)
        {
            Timer_Job(sender, e);

            StartTimer();
        }


        private void Timer_Job(object sender, EventArgs e)
        {
            try
            {
                _selenium = new Selenium();

                ChromeOptions options = new ChromeOptions();

                _selenium.Init(options);

                if (_items != null && _items.Count > 0)
                {
                    GetMinPrice(_items);

                    richTextBox1.AppendText($"각 상품번호 별 등록된 링크의 현재 최저가 리스트입니다.\n");
                    foreach (var item in _items)
                    {
                        richTextBox1.AppendText($"상품번호 : {item.no} , 최저가 : {item.now_min_price}\n");
                    }
                    richTextBox1.AppendText($"------------------------------------------------------------------------------\n");

                    ChangePrice();
                }
                else
                {
                    throw new Exception("아이템 리스트가 없습니다. 3초후 자동 종료됩니다.");
                }

            }
            catch (Exception err)
            {
                richTextBox1.AppendText($"Error : { err.ToString()}");

                ////3초 후 자동 종료
                //Thread.Sleep(3000);
                //Environment.Exit(0);
            }
            finally
            {
                _selenium.Close();
            }
        }
        void StartTimer()
        {
            System.Windows.Forms.Timer timer = new System.Windows.Forms.Timer();
            timer.Interval = int.Parse(textBox1.Text) * 60 * 1000;
            timer.Enabled = true;
            timer.Tick += Timer_Job;
        }


        private void GetMinPrice(List<Item> items) {
            //최저가 가져오기
            for (int i = 0; i < items.Count; ++i)
            {
                string url = items[i].link;

                if (url == "") {
                    richTextBox1.AppendText($"상품번호 {items[i].no} 는 링크가 비어 있으므로 넘어갑니다. 최저가가 0으로 표시됨\n");
                    continue;
                }

                Uri uriResult;
                bool result = Uri.TryCreate(url, UriKind.Absolute, out uriResult)
                    && (uriResult.Scheme == Uri.UriSchemeHttps || uriResult.Scheme == Uri.UriSchemeHttp);

                if (!result) throw new Exception("올바르지 않은 URL입니다. 3초후 자동 종료됩니다.");

                _selenium.LocationUrl(url);

                string xPath = "//*[@id='__next']/div/div[2]/div[2]/div[2]/div[1]/div/div[2]/div[1]/div[1]/em";
                string price = _selenium.GetValue(xPath);
                string[] priceSplit = price.Split(',');
                StringBuilder rawPrice = new StringBuilder();
                foreach (var p in priceSplit)
                {
                    rawPrice.Append(p);
                }

                ////최저가 int형으로 변환
                long priceLong = long.Parse(rawPrice.ToString());
                items[i].now_min_price = priceLong;
            }

            richTextBox1.AppendText($"------------------------------------------------------------------------------\n");
        }
    }
}