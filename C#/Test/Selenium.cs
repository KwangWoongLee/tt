using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

//Selenium Library
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;

namespace Test
{
    public class Selenium
    {
        public void Init(ChromeOptions options = null)
        {
            var driverService = ChromeDriverService.CreateDefaultService();
            driverService.HideCommandPromptWindow = true;

            if (options != null) _driver = new ChromeDriver(driverService, options);
            else _driver = new ChromeDriver(driverService);

            _driver.Manage().Timeouts().PageLoad = TimeSpan.FromSeconds(10);
            _driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(10);

        }

        public void Close() 
        {
            _driver.Close();
        }

        public void LocationUrl(string url)
        {
            //페이지 시작
            _driver.Navigate().GoToUrl(url);
        }

        public void ClearId(String id)
        {
            //셀레니움에서 element를 id로 찾아 값 입력
            _driver.FindElement(By.Id(id)).Clear();
        }

        public void SendKeyId(String id, String value)
        {
            //셀레니움에서 element를 id로 찾아 값 입력
            _driver.FindElement(By.Id(id)).SendKeys(value);
        }

        public void SendKeyByXPath(String xPath, String value)
        {
            //셀레니움에서 element를 xPath로 찾아 값 입력
            _driver.FindElement(By.XPath(xPath)).SendKeys(value);
        }

        public void ClickEnter(String xPath)
        {
            //셀레니움에서 element를 xPath로 찾아 엔터
            _driver.FindElement(By.XPath(xPath)).SendKeys(Keys.Enter);
        }

        public void ClickById(String id)
        {   
            //셀레니움에서 element를 id로 찾아 클릭
            By by = By.Id(id);
            _driver.FindElement(by).Click();
        }

        public void ClickByXPath(String xPath)
        {
            //셀레니움에서 element를 xPath로 찾아 클릭
            By by = By.XPath(xPath);
            _driver.FindElement(by).Click();
        }

        public IWebElement GetBySelector(String selector)
        {
            By by = By.CssSelector(selector);
            return _driver.FindElement(by);
        }

        public string GetValueById(String id)
        {
            var elem = _driver.FindElement(By.Id(id));
            return elem.Text;
        }

        public string GetValue(String xPath)
        {
            var elem = _driver.FindElement(By.XPath(xPath));
            return elem.Text;
        }






        ChromeDriver _driver;
        private ChromeOptions _options;
        public Dictionary<String, String> _cookies;
    }
}
