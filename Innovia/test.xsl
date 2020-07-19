<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:param name="quote" select="'" />
  <xsl:param name="href" select="a href=" />
  <xsl:param name="target" select="target='_empty'>" />
  <xsl:template match="/">
        <div class='item'>
            <div class='row'>
                <div class='col-lg-12'>
                    <center>
                        <xsl:for-each select="root/Row">
                          <xsl:value-of select="$href"/>
                          <xsl:value-of select="$quote"/>
                            <xsl:value-of select="url"/>
                          <xsl:value-of select="$quote"/>
                          <xsl:value-of select="$target"/>
                          <xsl:value-of select="@fullAddr"/>
                        </xsl:for-each>
                    </center>
                </div>
            </div>
        </div>
    </xsl:template>
</xsl:stylesheet>