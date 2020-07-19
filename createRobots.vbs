set fso = createobject("scripting.filesystemobject")

Dim robots
Set robots = fso.OpenTextFile("robots.txt", 2, true)
Dim sitemap
Set sitemap = fso.OpenTextFile("sitemap.xml", 2, true)

dim CurrentDirectory
CurrentDirectory = fso.GetAbsolutePathName(".")
WorkingDirectory = mid(CurrentDirectory, InStrRev(CurrentDirectory, "\") + 1, 100)
dim ObjDir
set ObjDir = fso.getFolder(CurrentDirectory)

robots.WriteLine "User-agent: *"
robots.WriteLine "Sitemap: http://" & WorkingDirectory & "/sitemap.xml"
robots.WriteLine "Allow: index.html"

Dim SubFolder
For Each SubFolder In ObjDir.SubFolders
	robots.WriteLine "Disallow: " & SubFolder.name & "/"
Next
Dim File
For Each File In ObjDir.Files
	if file.name <> "createRobots.vbs" then
		robots.WriteLine "Disallow: " & File.name
	end if
Next

robots.Close

sitemap.WriteLine "<?xml version='1.0' encoding='UTF-8'?>"
sitemap.WriteLine "<urlset xmlns=""http://www.sitemaps.org/schemas/sitemap/0.9"""
sitemap.WriteLine "	xmlns:xsi=""http://www.w3.org/2001/XMLSchema-instance"""
sitemap.WriteLine "	xsi:schemaLocation=""http://www.sitemaps.org/schemas/sitemap/0.9"
sitemap.WriteLine "			    http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"">"
sitemap.WriteLine "	<url>"
sitemap.WriteLine "		<loc>http://" & WorkingDirectory & "/index.html</loc>"
sitemap.WriteLine "	</url>"
sitemap.WriteLine "</urlset>"
sitemap.Close
