<%@ page language="java" contentType="text/html; charset=UTF-8"
		 import="com.baidu.ueditor.ActionEnter"
		 pageEncoding="UTF-8" %>
<%@ page trimDirectiveWhitespaces="true" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
	if ("uploadimage".equalsIgnoreCase(request.getParameter("action"))) {
%>
<c:import url="/common/UE/uploadUEImage"></c:import>
<%--<form:form action="/common/UE/uploadUEImage" method="post"></form:form>--%>
<%
} else if ("uploadfile".equalsIgnoreCase(request.getParameter("action"))) {
%>
<c:import url="/common/UE/uploadUEFile"></c:import>
<%--<form:form action="/common/UE/uploadUEFile" method="post"></form:form>--%>
<%
	} else {
		request.setCharacterEncoding("utf-8");
		response.setHeader("Content-Type", "text/html");
		String rootPath = application.getRealPath("/");
		String exec = new ActionEnter(request, rootPath).exec();
		out.write(exec);
	}
%>