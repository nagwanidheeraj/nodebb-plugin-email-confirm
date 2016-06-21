<form role="form" class="email-confirm-group-settings">
	<div class="row">
		<div class="col-sm-2 col-xs-12 settings-header">General</div>
		<div class="col-sm-10 col-xs-12">
			<p class="lead">
				Select a group to move the user to after email confirmation
			</p>
			<div class="form-group">
				<label for="targetGroup">Target Group</label>
				<select id="targetGroup" name="targetGroup" title="Move to Group" class="form-control">
				<!-- BEGIN groups -->
					<option>{groups.displayName}</option>
				<!-- END groups -->
				</select>
			</div>
		</div>
	</div>
</form>

<button id="save" class="floating-button mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
	<i class="material-icons">save</i>
</button>
