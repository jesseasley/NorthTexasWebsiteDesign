<div class="row">
	<div class="col-lg-1"></div>
	<div class="col-lg-10">
	    <div id="thankspage" class="">
			<div class="panel panel-default">
				<div class="panel-heading">Email Results</div>
				<div class="panel-body">
					<div id="emailResults"></div>
				</div>
			</div>
		</div>
		<div id="contactuspage" class="">
			<link rel="canonical" href="http://NorthTexasWebsiteDesign.com/ContactUs">
			<div class="panel panel-default">
				<div class="panel-heading">Contact Us</div>
				<div class="panel-body">
					<div id="divContactnameText" class="form-group has-error has-feedback">
						<input type="text" id="nameText" onchange="validateField('nameText', 'Contact');" 
							class="form-control" value="" required/>
						<label class="form-control-placeholder" for="nameText">Name</label>
					</div>
					<div id="divContactemailText" class="form-group has-error has-feedback">
						<input type="text" id="emailText" onchange="validateField('emailText', 'Contact');" 
							class="form-control" value="" required/>
						<label class="form-control-placeholder" for="emailText">Email</label>
					</div>
					<div id="divContactphoneText" class="form-group has-error has-feedback">
						<input type="text" id="phoneText" onchange="validateField('phoneText', 'Contact');" 
							class="form-control" value="" required/>
						<label class="form-control-placeholder" for="phoneText">Phone</label>
					</div>
					<div class="form-group">
						<input type="text" id="subjectText" class="form-control" value="" required/>
						<label class="form-control-placeholder" for="subjectText">Subject</label>
					</div>
					<div class="form-group">
						<textarea rows="5" id="bodyTextArea" class="form-control" required></textarea>
						<label class="form-control-placeholder" for="bodyTextArea">Message</label>
					</div>
					<input type="hidden" value="Send" name="sendButton" />
					<center>
						<button class="btn btn-primary pull-right" onclick="sendMail();">Send</button>
					</center>
					<table border="0" cellspacing="0" cellpadding="0" class="darktext">
						<tr>
							<td colspan="2" align="right"></td>
						</tr>
					</table>
				</div>
			</div>
		</div>
	</div>
	<div class="col-lg-1"></div>
	<script>$("#nameText").focus()</script>
</div>
