#!/usr/bin/perl

sub noln {
	my $basename = shift;
	
	my $in = "$basename.js";
	my $out = "$basename.min.js";
	
	print "File: $in -> $out\n";
	
	open IN_F, "<", $in;
	open OUT_F, ">", $out;
	
	while (<IN_F>)
	{
		chomp;
		print OUT_F $_;
	}
}

noln "landgen";
noln "source";
